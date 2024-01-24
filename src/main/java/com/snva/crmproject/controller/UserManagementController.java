package com.snva.crmproject.controller;

import com.snva.crmproject.entity.userDetails.User;
import com.snva.crmproject.service.AuthenticationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "${fontEnd.origins}")
@RequestMapping("api/v1/users")
@RestController
public class UserManagementController {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserManagementController.class);

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/{userId}")
    public User getUserById(@PathVariable long userId) {
        LOGGER.info("pulling data for user with id:" + userId);
        return authenticationService.getUserDetailsbyUserId(userId);
    }

    @GetMapping
    public List<User> getAllUsers() {
        LOGGER.info("pulling all users");
        return authenticationService.getAllUsers();
    }

    @PatchMapping("/password")
    User updatePassword(@RequestBody User user) {
        LOGGER.info("updating password for " + user.getUsername() + " user");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return authenticationService.updatePassword(user);
    }

    @PostMapping
    User updateUser(@RequestBody User user) {
        LOGGER.info("Updating " + user.getUsername() + " user");
        return authenticationService.updateUser(user);
    }

    @PostMapping("/suspend")
    User suspendUser(@RequestBody User user) {
        LOGGER.info("suspending " + user.getUsername() + " user");
        return authenticationService.suspendUser(user);
    }

}
