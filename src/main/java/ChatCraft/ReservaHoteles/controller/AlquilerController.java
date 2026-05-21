package ChatCraft.ReservaHoteles.controller;

import ChatCraft.ReservaHoteles.dto.AlquilerDTO;
import ChatCraft.ReservaHoteles.model.Alquiler;
import ChatCraft.ReservaHoteles.service.AlquilerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alquileres")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AlquilerController {

    private final AlquilerService alquilerService;

    @GetMapping
    public ResponseEntity<List<Alquiler>> listar() {
        return ResponseEntity.ok(alquilerService.listarAlquileres());
    }

    @PostMapping
    public ResponseEntity<Alquiler> crear(@RequestBody AlquilerDTO dto) {
        return ResponseEntity.ok(alquilerService.crearAlquiler(dto));
    }
}
