package com.snva.crmproject;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Scanner;

import org.apache.tomcat.util.json.JSONParser;
import org.json.simple.JSONObject;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import jakarta.mail.internet.ParseException;

import java.io.FileInputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.snva.crmproject.entity.userDetails.User;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;
import java.io.IOException;

@SpringBootApplication
public class CrmProjectApplication implements CommandLineRunner{

	 
    //url will represent our connection string. Since this is an in-memory db, we will represent a file location to store the data
//    private static String url = "jdbc:mysql://localhost:3306/SDP_DB?allowPublicKeyRetrieval=true";
//    private static String username = "root";
//    private static String password = "root";
//
//    private static Connection connection = null;

	public static void main(String[] args) {
		SpringApplication.run(CrmProjectApplication.class, args);
	}

	//     /**
    //  * @return active connection to the database
    //  */
    // public static Connection getConnection(){
    //     if(connection == null){
    //         try {
    //             connection = DriverManager.getConnection(url, username, password);

    //         } catch (SQLException e) {
    //             e.printStackTrace();
    //         }
    //     }

    //     return connection;
    // }
	// public static void databaseSetup(){
    //     try {
    //         Connection conn = getConnection();
    //         // PreparedStatement ps1 = conn.prepareStatement("drop table if exists user");
    //         // ps1.executeUpdate();
    //         // PreparedStatement ps2 = conn.prepareStatement("drop table if exists author");
    //         // ps2.executeUpdate();
    //         // PreparedStatement ps3 = conn.prepareStatement("create table author(" +
    //         //         "id int primary key auto_increment, " +
    //         //         "name varchar(255)); ");
    //         // ps3.executeUpdate();
           
    //         // PreparedStatement ps5 = conn.prepareStatement(
    //         //         "insert into author (name) values " +
    //         //                 "('jorge luis borges')," +
    //         //                 "('italo calvino')," +
    //         //                 "('thomas pynchon')," +
    //         //                 "('marshall mcluhan')," +
    //         //                 "('immanuel kant')");
    //         // ps5.executeUpdate();
	// 		PreparedStatement ps6;
	// 		String str = parseJsonFile("problem2.sql");
	// 		ps6 = conn.prepareStatement(
	// 			"insert into user (firstName, lastName, userId, phone, role) values " +
	// 					"({firstName}, lastname, 'userid', phone, role);");
	// 	ps6.executeUpdate();
	// }catch(SQLException e){
	// 	e.printStackTrace();
	// }
    // }
// 	    public static void parseJsonFile() {

      
//     try {
		
	
// 			//create ObjectMapper instance
// 			ObjectMapper objectMapper = new ObjectMapper();
	
// 			//read JSON file and convert to a customer object
// 			User user = objectMapper.readValue(new File("resources/users.json"), User.class);
	
// 			//print customer details
// 			System.out.println(user);
		

//     } catch (IOException e) {
//         e.printStackTrace();
//     }
    
// }

	@Override
	public void run(String[] args) throws IOException {
	
		try {
			
		
			//create ObjectMapper instance
			ObjectMapper objectMapper = new ObjectMapper();
	
			//read JSON file and convert to a customer object
			//InputStream is = getClass().getResourceAsStream("/users.txt");
			User user = objectMapper.readValue(new File("/users.json"), User.class);
	
			//print customer details
			System.out.println(user);
		
	
		} 
		catch (IOException e) {
			e.printStackTrace();
		}
		
	}
}