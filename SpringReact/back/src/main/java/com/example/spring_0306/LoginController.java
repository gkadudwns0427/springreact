package com.example.spring_0306;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {

    @Autowired
    private LoginRepository loginRepository;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Login login) {
        //중복 체크
        if(loginRepository.findByUserId(login.getUserId()) != null) {
            return ResponseEntity.badRequest().body("중복된 아이디 입니다!");
        }

        loginRepository.save(login);
        return ResponseEntity.ok("회원가입 되었습니다!");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Login login) {
        Login user = loginRepository.findByUserId(login.getUserId());
        if(user == null || !user.getPassword().equals(login.getPassword())) {
            return ResponseEntity.badRequest().body("아이디 혹은 비밀번호가 잘못 되었습니다!");
        }
        return ResponseEntity.ok("로그인 성공!");
    }

}
