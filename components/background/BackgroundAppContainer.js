import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./Navbar";
import axios from "axios";
import lottie from "lottie-web";

import Lottie_InProcess from "../../src/lottie-files/18176-card-payment-in-process.json";
import Lottie_PaymentSuccess from "../../src/lottie-files/16271-payment-successful.json";

import { RewardSlider } from "./RewardSlider";
import { RewardPreview } from "./RewardPreview";
import NextStepViewer from "./NextStepsViewer";

export default class BackgroundAppContainer extends React.Component {
  constructor(props) {
    super(props);

    this.lottiePendingContainer = React.createRef();

    this.state = {
      current_user: null,
      transaction_state: "<pending>",
      donation_data: null,
      updated_level: null,
      updated_medals: null,
      slider_complete: false,
    };
  }

  componentDidMount() {
    this.getCurrentUser();
    this.processTransaction();
    this.loadLottie();
  }

  componentDidUpdate() {
    this.loadLottie();
  }

  loadLottie() {
    // load lottie

    let lottie_files = {
      in_process: Lottie_InProcess,
      success: Lottie_PaymentSuccess,
    };
    let lottie_file = lottie_files.in_process; // default
    let options = {};
    if (this.state.transaction_state == "<pending>") {
      lottie_file = lottie_files.in_process;
      options.loop = true;
      options.autoplay = true;
      options.container = this.lottiePendingContainer.current;
    }
    if (options.container) this.clearChildren(options.container);
    lottie.loadAnimation({
      container: options.container,
      renderer: "svg",
      loop: options.loop ? options.loop : false,
      autoplay: options.autoplay ? options.autoplay : false,
      animationData: lottie_file,
    });
  }

  updateLevel(new_level) {
    this.setState({ updated_level: new_level });
  }

  clearChildren(dom_element) {
    while (dom_element.hasChildNodes()) {
      dom_element.removeChild(dom_element.lastChild);
      console.log(`Removed child...`);
    }
  }

  processTransaction() {
    let process_query = `mutation { processDonation(reciept_id: "${this.props.donation_info.reciept_id}") { previous_experience_value, experience_gained, total_donation, medals_unlocked { _id, name, description, asset_key}} }`;
    console.log(`Query String: ${process_query}`);

    axios
      .post("http://localhost:4000/graphql", {
        query: process_query,
      })
      .then((res) => {
        console.log(`Processing transaction ...`);
        console.log(res);
        console.log(res.data.data.processDonation);

        // update transaction state
        this.setState(
          {
            transaction_state: "<success>",
            donation_data: res.data.data.processDonation,
          },
          () => {
            console.log(`Transaction successful.`);
            console.log(this.state.transaction_state);
          }
        );
      })
      .catch((err) => {
        console.log(`Error processing transaction...`);
        console.log(err);
      });
  }

  getCurrentUser() {
    let user_id = this.props.donation_info.user_data.user_id;

    axios
      .post("http://localhost:4000/graphql", {
        query: `{ user(_id: "${user_id}") { firstName, lastName, experience, medals { name, asset_key } } }`,
      })
      .then((res) => {
        console.log(res);
        this.setState({ current_user: res.data.data.user });
      })
      .catch((err) => {
        console.log(`Error getting current user`);
        console.log(err);
      });
  }

  updateMedals(new_medals) {
    this.setState({ updated_medals: new_medals });
  }

  render() {
    return (
      <div className="background-container">
        <div className="center-container">
          <Navbar
            user={this.state.current_user}
            updatedLevel={this.state.updated_level}
            updatedMedals={this.state.updated_medals}
          />

          {this.state.transaction_state == "<pending>" && (
            <div
              ref={this.lottiePendingContainer}
              style={{ height: "350px" }}
            ></div>
          )}
          {this.state.transaction_state == "<pending>" && (
            <div
              style={{
                fontSize: "1.3rem",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Processing transaction.
            </div>
          )}
          {this.state.transaction_state == "<success>" && (
            <RewardSlider
              experience_value={
                this.state.donation_data == null
                  ? 0
                  : this.state.donation_data.previous_experience_value
              }
              experience_gained={
                this.state.donation_data == null
                  ? 0
                  : this.state.donation_data.experience_gained
              }
              medals_unlocked={
                this.state.donation_data == null
                  ? []
                  : this.state.donation_data.medals_unlocked
              }
              updateLevel={(new_lvl) => {
                console.log(`Reward Slider returned.`);
                this.updateLevel(new_lvl);
              }}
              updateMedals={(new_medals) => {
                console.log(`New Medals returned`);
                console.log(new_medals);
                this.updateMedals(new_medals);
              }}
              sliderComplete={() => {
                console.log("Slider complete");
                this.setState({ slider_complete: true });
              }}
            />
          )}
          <RewardPreview
            experience_gained={
              this.state.donation_data == null
                ? 0
                : this.state.donation_data.experience_gained
            }
            medals_unlocked={
              this.state.donation_data == null
                ? []
                : this.state.donation_data.medals_unlocked
            }
          />
          <NextStepViewer show={this.state.slider_complete} />
        </div>
      </div>
    );
  }
}

// experience_value={ this.state.donation_data == null ? 0 : this.state.donation_data.previous_experience_value }
// experience_gained={ this.state.donation_data == null ? 0 : this.state.donation_data.experience_gained }
