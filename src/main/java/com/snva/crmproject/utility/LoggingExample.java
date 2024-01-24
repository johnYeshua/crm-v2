package com.snva.crmproject.utility;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Dummy example of logging usage. To replace system.out
 * don't forget add dependency to your pom.xml
 *      <!-- SLF4J and Logback -->
 * 		<dependency>
 * 			<groupId>org.springframework.boot</groupId>
 * 			<artifactId>spring-boot-starter-logging</artifactId>
 * 		</dependency>
 */
public class LoggingExample {

    private static final Logger LOGGER = LoggerFactory.getLogger(LoggingExample.class);

    public static void main(String[] args) {
        LOGGER.info("Example of info message");
        LOGGER.warn("Example of warning message.");
        LOGGER.error("Example of error message");
    }
}
