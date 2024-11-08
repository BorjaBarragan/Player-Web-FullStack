package com.springboot.backend.borja.playersapp.players_backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.borja.playersapp.players_backend.entities.Player;
import com.springboot.backend.borja.playersapp.players_backend.services.PlayerService;

import jakarta.validation.Valid;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@CrossOrigin(origins={"http://localhost:4200"})
@RestController
@RequestMapping("/api/players")
public class PlayerController {

    @Autowired
    // @Autowired hace el efecto del constructor.
    private PlayerService service;

    @GetMapping
    public List<Player> list() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    // <Player> , lo cambiamos a <?>, ya que nos saltaba error. Podia ser un Player
    // o un Map o HashMap
    public ResponseEntity<?> show(@PathVariable Long id) {
        // Estamos obligados a validar, ya que id puede ser null, de ahi el uso de
        // Optional
        Optional<Player> playerOptional = service.findById(id);
        if (playerOptional.isPresent()) {
            // get(), es parecido a poner orElseThrow()
            return ResponseEntity.status(HttpStatus.OK).body(playerOptional.orElseThrow());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap("error", "El usuario no se encontro por el id" + id));
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Player player, BindingResult result) {       
        if(result.hasErrors()) {
            return validation(result);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(player));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@Valid @RequestBody Player player, BindingResult result ,@PathVariable Long id) {
        if(result.hasErrors()) {
            return validation(result);
        }
        Optional<Player> playerOptional = service.findById(id);
        if (playerOptional.isPresent()) {
            // Obtenemos jugador existente y actualizamos
            Player playerDb = playerOptional.get();
            playerDb.setName(player.getName());
            playerDb.setLastName(player.getLastName());
            playerDb.setAge(player.getAge());
            playerDb.setNationality(player.getNationality());
            playerDb.setNumber(player.getNumber());
            playerDb.setPosition(player.getPosition());
            playerDb.setEmail(player.getEmail());
            playerDb.setPassword(player.getPassword());
            return ResponseEntity.ok(service.save(playerDb));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Optional<Player> playerOptional = service.findById(id);
        if (playerOptional.isPresent()) {
            service.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    //Cremos metodo para validar post y put y no repetir codigo en ambos.
    private ResponseEntity<?> validation(BindingResult result) {
        Map<String, String> errors = new HashMap<>();
        result.getFieldErrors().forEach(error -> {  
            errors.put(error.getField(), "El campo " + error.getField() + " " + error.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errors);
    }
}
