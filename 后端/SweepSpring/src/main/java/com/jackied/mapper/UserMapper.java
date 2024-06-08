package com.jackied.mapper;

import com.jackied.pojo.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserMapper {
    @Select("select* from user ")
    List<User> selectAll();

    @Select("select * from user where id = #{id}")
    User selectByID(Integer id);

    @Select("select * from user where name = #{name}")
    User selectByName(String name);

    @Update("UPDATE user SET name = #{name}, password = #{password},challengeTimes = #{challengeTimes}, simpleTime=#{simpleTime},commonTime=#{commonTime},difficultTime=#{difficultTime} WHERE id = #{id}")
    int updateByID(User user);

    @Insert("INSERT INTO user(name, password, challengeTimes,simpleTime,commonTime,difficultTime) VALUES(#{name}, #{password}, #{challengeTimes}, #{simpleTime}, #{commonTime}, #{difficultTime})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insertUser(User user);

}
