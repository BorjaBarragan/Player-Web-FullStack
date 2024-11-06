package com.springboot.backend.borja.playersapp.players_backend.repositories;

import org.springframework.data.repository.CrudRepository;

import com.springboot.backend.borja.playersapp.players_backend.entities.Player;

public interface PlayerRepository extends CrudRepository <Player , Long>{


}
