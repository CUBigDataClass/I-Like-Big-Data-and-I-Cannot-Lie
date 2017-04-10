package com.ilbdaicnl.storm;

import org.apache.storm.utils.Utils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ilbdaicnl.resources.ResourceMgr;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.apache.storm.Config;
import org.apache.storm.LocalCluster;
import org.apache.storm.topology.TopologyBuilder;

public class TwitterStreamTopology {
	public static void main(String[] args) {
		final Logger logger = LoggerFactory.getLogger(TwitterStreamTopology.class);
		
        String consumerKey = "";
        String consumerSecret = "";
        String accessToken = "";
        String accessTokenSecret = "";
        List<String> keyWords = new ArrayList<String>();
        
        ResourceMgr resourceMgr = ResourceMgr.getInstance();
        
        consumerKey = resourceMgr.getConsumerKey();
        consumerSecret = resourceMgr.getConsumerSecret();
        accessToken = resourceMgr.getAccessToken();
        accessTokenSecret = resourceMgr.getAccessTokenSecret();
        keyWords = resourceMgr.getKeyWords();
        
        TopologyBuilder builder = new TopologyBuilder();

        builder.setSpout("twitter", new TwitterStreamSpout(consumerKey, consumerSecret,
                accessToken, accessTokenSecret, keyWords.toArray(new String[0])));
        builder.setBolt("formatter", new TweetFormatterBolt()).shuffleGrouping("twitter");
        builder.setBolt("geolocation", new GeolocationBolt()).shuffleGrouping("formatter");
//        builder.setBolt("sentiment", new SentimentAnalysisBolt(), 1).shuffleGrouping("geolocation", "success");
        builder.setBolt("print", new TwitterStreamPrint()).shuffleGrouping("geolocation", "success");
//        builder.setBolt("insert", new CassandraInsertBolt()).shuffleGrouping("sentiment");
//        builder.setBolt("log", new CassandraInsertBolt()).shuffleGrouping("insert", "error");


        Config conf = new Config();


        LocalCluster cluster = new LocalCluster();

        cluster.submitTopology("racialMapping", conf, builder.createTopology());

        Utils.sleep(1000000);
        cluster.shutdown();
    }
}
