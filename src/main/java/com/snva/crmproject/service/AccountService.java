package com.snva.crmproject.service;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.snva.crmproject.entity.userDetails.User;
import com.snva.crmproject.repository.AccountRepository;

@Service
public class AccountService {

    private final AccountRepository accountRepository;

    @Autowired
    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }
    

      public void deleteUserById(Long userId) {
        accountRepository.deleteById(userId);
    }
    
    public Optional<User> getAccountByUsername(String username) {
        if (username != null) {
            // logic 
            return AccountRepository.findByUsername(username);
        } else {
            return Optional.empty(); 
        }
    }

}