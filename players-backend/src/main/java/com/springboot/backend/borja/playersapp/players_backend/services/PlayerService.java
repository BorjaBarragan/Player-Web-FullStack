package com.springboot.backend.borja.playersapp.players_backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.lang.NonNull;

import com.springboot.backend.borja.playersapp.players_backend.entities.Player;

public interface PlayerService {

    List<Player> findAll();

    Optional <Player> findById(@NonNull Long id);

    Player save(Player player);

    void deleteById(@NonNull Long id);

}
