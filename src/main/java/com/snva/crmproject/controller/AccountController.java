package com.snva.crmproject.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.snva.crmproject.entity.userDetails.User;
import com.snva.crmproject.service.AccountService;

@CrossOrigin(origins="http://localhost:4200/")
@RestController
@RequestMapping("/users")
public class AccountController {

    private final AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("/searchAccount")
    public ResponseEntity<User> getUserByUsername(
            @RequestParam(required = true) String username
    ) {
        Optional<User> user = accountService.getAccountByUsername(username);

        return user.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @DeleteMapping("/account/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId) {
        accountService.deleteUserById(userId);
        return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
    }
}