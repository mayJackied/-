package com.jackied.controller;

import com.jackied.mapper.UserMapper;
import com.jackied.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Comparator;
import java.util.List;

@RestController
public class Controller {
    @Autowired
    private UserMapper userMapper;

    @RequestMapping("/selectAll")
    public List<User> SelectAll() {
        List<User> users = userMapper.selectAll();

        return users;
    }

    @RequestMapping("/selectByType")
    public List<User> selectByType(Character type) {
        List<User> users = userMapper.selectAll();
        users.sort(new Comparator<User>() {
            @Override
            public int compare(User o1, User o2) {
                switch (type) {
                    case '1' -> {
                        if (o1.getSimpleTime().equals("暂无数据")) {
                            return 1;
                        }
                        if (o2.getSimpleTime().equals("暂无数据")) {
                            return -1;
                        }
                        return Integer.parseInt(o1.getSimpleTime()) - Integer.parseInt(o2.getSimpleTime());
                    }
                    case '2' -> {
                        if (o1.getCommonTime().equals("暂无数据")) {
                            return 1;
                        }

                        if (o2.getCommonTime().equals("暂无数据")) {
                            return -1;
                        }
                        return Integer.parseInt(o1.getCommonTime()) - Integer.parseInt(o2.getCommonTime());
                    }
                    case '3' -> {
                        if (o1.getDifficultTime().equals("暂无数据")) {
                            return 1;
                        }

                        if (o2.getDifficultTime().equals("暂无数据")) {
                            return -1;
                        }
                        return Integer.parseInt(o1.getDifficultTime()) - Integer.parseInt(o2.getDifficultTime());
                    }
                }
                return 0;
            }
        });
        return users;
    }

    @RequestMapping("/insertUser")
    public int insertUser(@RequestBody User user) {
        userMapper.insertUser(user);
        User returnUser = userMapper.selectByName(user.getName());
        System.out.println(returnUser.getId());
        return returnUser.getId();
    }

    @RequestMapping("/updateUserChallengeByID")
    public void updateUserChallengeByID(Integer id, String update, String difficulty) {
        User user = userMapper.selectByID(id);
        int i = Integer.parseInt(user.getChallengeTimes());
        i++;
        user.setChallengeTimes(String.valueOf(i));
        switch (difficulty) {
            case "simple" -> {
                if (user.getSimpleTime().equals("暂无数据") || Integer.parseInt(user.getSimpleTime()) > Integer.parseInt(update)) {
                    user.setSimpleTime(update);
                    userMapper.updateByID(user);
                }
            }
            case "common" -> {
                if (user.getCommonTime().equals("暂无数据") || Integer.parseInt(user.getCommonTime()) > Integer.parseInt(update)) {
                    user.setCommonTime(update);
                    userMapper.updateByID(user);
                }
            }
            case "difficult" -> {
                if (user.getDifficultTime().equals("暂无数据") || Integer.parseInt(user.getDifficultTime()) > Integer.parseInt(update)) {
                    user.setDifficultTime(update);
                    userMapper.updateByID(user);
                }
            }
        }
    }
}
