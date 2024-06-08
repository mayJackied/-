package com.jackied.pojo;

public class User {
    private Integer id;
    private String name;
    private String password;
    private String challengeTimes ;
    private String simpleTime;
    private String commonTime;
    private String difficultTime;

    public User(Integer id, String name, String password, String challengeTimes, String simpleTime, String commonTime, String difficultTime) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.challengeTimes = challengeTimes;
        this.simpleTime = simpleTime;
        this.commonTime = commonTime;
        this.difficultTime = difficultTime;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }



    public User() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getChallengeTimes() {
        return challengeTimes;
    }

    public void setChallengeTimes(String challengeTimes) {
        this.challengeTimes = challengeTimes;
    }

    public String getSimpleTime() {
        return simpleTime;
    }

    public void setSimpleTime(String simpleTime) {
        this.simpleTime = simpleTime;
    }

    public String getCommonTime() {
        return commonTime;
    }

    public void setCommonTime(String commonTime) {
        this.commonTime = commonTime;
    }

    public String getDifficultTime() {
        return difficultTime;
    }

    public void setDifficultTime(String difficultTime) {
        this.difficultTime = difficultTime;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", password='" + password + '\'' +
                ", challengeTimes='" + challengeTimes + '\'' +
                ", simpleTime='" + simpleTime + '\'' +
                ", commonTime='" + commonTime + '\'' +
                ", difficultTime='" + difficultTime + '\'' +
                '}';
    }
}
