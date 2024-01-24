package com.snva.crmproject.service;

import com.snva.crmproject.entity.userDetails.User;
import com.snva.crmproject.repository.user.AuthenticationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl {
    private static final Logger LOGGER = LoggerFactory.getLogger(AuthServiceImpl.class);

    @Autowired
    AuthenticationRepository authenticationRepository;

    public User getUserDetailsbyUserName(String username) {
        LOGGER.info("Pulling data for " + username + " user");
        User user = authenticationRepository.findUserByUsername(username).get();

        return user;
    }

}
