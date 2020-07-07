import React, { useEffect, useState, useRef } from "react";
import Twitter from "twitter-lite";
import axios from "axios";
import { motion, useAnimation } from "framer-motion";

import { AssetVars } from "../../src/js/assetVars";
import TwitterIcon from "../../src/icons/twitter.svg";

const RewardPill = ({ reward_src, reward_text }) => {
  return (
    <div className="reward-pill">
      <div className="reward-icon">
        <img src={reward_src} width="65%" height="65%" />
      </div>
      <div className="reward-text">{reward_text}</div>
    </div>
  );
};

const RewardPreview = ({ experience_gained, medals_unlocked }) => {
  const [tweetCreds, setTweetCreds] = useState(null);
  const twitterMessageRef = useRef(null);
  const [tweetSent, setTweetSent] = useState(false);
  const successTweetControl = useAnimation();

  const initiateTwitterAuth = () => {
    axios
      .post(`http://3.21.56.172:4000/graphql`, {
        query: `query { initiateTwitterAuth { oauth_token, oauth_token_secret } }`,
      })
      .then((res) => {
        console.log(`Initiate twitter auth began!`);
        console.log(res);

        let auth_info = res.data.data.initiateTwitterAuth;
        window.open(
          `https://api.twitter.com/oauth/authorize?oauth_token=${auth_info.oauth_token}`,
          "_blank"
        );

        // monitorTwitterAuth
        axios
          .post(`http://3.21.56.172:4000/graphql`, {
            query: `query { monitorTwitterAuth(oauth_token: "${auth_info.oauth_token}") { oauth_token, oauth_token_secret } }`,
          })
          .then((monitor_res) => {
            console.log(`Monitor Twitter Auth responded with: `);
            console.log(monitor_res);

            setTweetCreds({
              oauth_token: monitor_res.data.data.monitorTwitterAuth.oauth_token,
              oauth_token_scret:
                monitor_res.data.data.monitorTwitterAuth.oauth_token_secret,
            });
          })
          .catch((monitor_err) => {
            console.log(`Monitor Twitter Auth error`);
            console.log(monitor_err);
          });
      })
      .catch((err) => {
        console.log(`Problem initiating twitter auth`);
        console.log(err);
      });
  };

  const showMedals = () => {
    let medal_pills = [];

    if (medals_unlocked) {
      for (let i = 0; i < medals_unlocked.length; ++i) {
        medal_pills.push(
          <RewardPill
            reward_src={AssetVars[medals_unlocked[i].asset_key]}
            reward_text={medals_unlocked[i].name}
          />
        );
      }
    }

    return medal_pills;
  };

  useEffect(() => {
    // mount

    console.log(`Configuring twitter-lite`);
    const twitterClient = new Twitter({
      consumer_key: "ElvTnb0OJ3J9DSF9cCI3HZXTl",
      consumer_secret: "807do5gaUWt4q5WPZH4pvPOyGczFtyzRoEktlSbiJ0lFqSXcNM",
    });

    twitterClient
      .getRequestToken("https://donatio-site.herokuapp.com/twitter")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleTweetSuccessMessage = async () => {
    await successTweetControl.start({
      opacity: 1,
      duration: 3,
    });
    await successTweetControl.start({
      opacity: 0,
      duration: 2.5,
    });
  };

  useEffect(() => {
    if (tweetSent) {
      handleTweetSuccessMessage();
    }
  }, [tweetSent]);

  const sendTweet = () => {
    console.log(`Sending tweet!`);
    let twitter_message = twitterMessageRef.current.value;
    console.log(`Twitter message: ${twitter_message}`);

    axios
      .post("http://3.21.56.172:4000/graphql", {
        query: `query { sendTweet(access_token: "${tweetCreds.oauth_token}", access_token_secret: "${tweetCreds.oauth_token_scret}", tweet: "${twitter_message}") }`,
      })
      .then((res) => {
        console.log(`Tweet Post Response`);
        console.log(res);

        setTweetSent(true);
      })
      .catch((err) => {
        console.log(`Error posting tweet`);
        console.log(err);
      });
  };

  return (
    <div className="reward-preview-area">
      <RewardPill
        reward_src={`https://svgur.com/i/M4w.svg`}
        reward_text={`+${experience_gained.toFixed(0)} exp. gained.`}
      />
      {showMedals()}
      <div
        className="twitter-button"
        onClick={() => {
          if (tweetCreds == null) {
            initiateTwitterAuth();
          }
        }}
      >
        <div className="icon-area">
          <img src={TwitterIcon} width={"80%"} height={"80%"} />
        </div>
        <div className="text-area">Share on Twitter!</div>
      </div>
      {tweetCreds != null && !tweetSent && (
        <div className="twitter-status-update">
          <textarea ref={twitterMessageRef}>#donatio</textarea>
          <div
            className="send-tweet-button"
            onClick={() => {
              sendTweet();
            }}
          >
            Tell the World!
          </div>
        </div>
      )}
      {tweetSent && (
        <motion.div
          animate={successTweetControl}
          className="tweet-sent-message"
        >
          Tweet made successfully!
        </motion.div>
      )}
    </div>
  );
};

export { RewardPreview };
