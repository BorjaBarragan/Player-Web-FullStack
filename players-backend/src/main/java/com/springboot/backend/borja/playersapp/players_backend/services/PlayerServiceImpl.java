package com.springboot.backend.borja.playersapp.players_backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.backend.borja.playersapp.players_backend.entities.Player;
import com.springboot.backend.borja.playersapp.players_backend.repositories.PlayerRepository;

@Service
public class PlayerServiceImpl implements PlayerService{

    
    private PlayerRepository repository;

    
    public PlayerServiceImpl(PlayerRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Player> findAll() {
        //return this.repository.findAll(), ponemos un cast para pasarlo a (List).
        return (List) this.repository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Player> findById(@NonNull Long id) {
        return repository.findById(id);
    }

    @Override
    @Transactional
    public Player save(Player player) {
        return this.repository.save(player);
    }

    @Override
    @Transactional
    public void deleteById(@NonNull Long id) {
         this.repository.deleteById(id);
    }

}
