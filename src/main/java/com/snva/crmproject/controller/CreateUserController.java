package com.snva.crmproject.controller;

import com.snva.crmproject.entity.userDetails.User;
import com.snva.crmproject.service.AuthenticationService;
import com.snva.crmproject.utility.Roles;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "${fontEnd.origins}")
@RequestMapping("api/v1/users")
@RestController
public class CreateUserController {
    private static final Logger LOGGER = LoggerFactory.getLogger(CreateUserController.class);

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    //TODO relatively dangerous to leave unsecure way to create super admin users
    @PostMapping("/register")
    public ResponseEntity<ResponseObject> createSuperAdmin(@RequestBody User user) {
        return createUser(user);
    }

    @PreAuthorize("hasAuthority('" + Roles.SUPER_ADMIN + "')")
    @PostMapping("/recruiter_admin")
    ResponseEntity<ResponseObject> createRecruiterAdmin(@RequestBody User user) {
        return createUser(user, Roles.RECRUITER_ADMIN);
    }

    @PreAuthorize("hasAuthority('" + Roles.SUPER_ADMIN + "')")
    @PostMapping("/trainer_admin")
    ResponseEntity<ResponseObject> createTrainerAdmin(@RequestBody User user) {
        return createUser(user, Roles.TRAINER_ADMIN);
    }

    @PreAuthorize("hasAuthority('" + Roles.SUPER_ADMIN + "')")
    @PostMapping("/bd_admin")
    ResponseEntity<ResponseObject> createBdAdmin(@RequestBody User user) {
        return createUser(user, Roles.BUSINESS_DEV_ADMIN);
    }

    @PreAuthorize("hasAuthority('" + Roles.RECRUITER_ADMIN + "')")
    @PostMapping("/recruiter")
    ResponseEntity<ResponseObject> createRecruiter(@RequestBody User user) {
        return createUser(user, Roles.RECRUITER);
    }

    @PreAuthorize("hasAuthority('" + Roles.TRAINER_ADMIN + "')")
    @PostMapping("/trainer")
    ResponseEntity<ResponseObject> createTrainer(@RequestBody User user) {
        return createUser(user, Roles.TRAINER);
    }

    @PreAuthorize("hasAuthority('" + Roles.BUSINESS_DEV_ADMIN + "')")
    @PostMapping("/db")
    ResponseEntity<ResponseObject> createBusinessDev(@RequestBody User user) {
        return createUser(user, Roles.BUSINESS_DEV);
    }

    private ResponseEntity<ResponseObject> createUser(User user, String role) {
        LOGGER.info("Creating " + user.getUsername() + " user with " + role + " role");
        user.setRole(role);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (authenticationService.createUser(user) == null) {
            return new ResponseEntity<ResponseObject>(new ResponseObject(false, "username exists"), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<ResponseObject>(new ResponseObject(true, "Successfully Created User"), HttpStatus.OK);
    }

    private ResponseEntity<ResponseObject> createUser(User user) {
        LOGGER.info("Creating " + user.getUsername() + " user with" + user.getRole() + " role");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (authenticationService.createUser(user) == null) {
            return new ResponseEntity<ResponseObject>(new ResponseObject(false, "username exists"), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<ResponseObject>(new ResponseObject(true, "Successfully Created User"), HttpStatus.OK);
    }
}
