package ChatCraft.ReservaHoteles.controller;

import ChatCraft.ReservaHoteles.dto.HabitacionDTO;
import ChatCraft.ReservaHoteles.model.Habitacion;
import ChatCraft.ReservaHoteles.service.HabitacionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/habitaciones")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class HabitacionController {

    private final HabitacionService habitacionService;

    @GetMapping
    public ResponseEntity<List<Habitacion>> listar() {
        return ResponseEntity.ok(habitacionService.listarHabitaciones());
    }

    @PostMapping
    public ResponseEntity<Habitacion> crear(@RequestBody HabitacionDTO dto) {
        return ResponseEntity.ok(habitacionService.crearHabitacion(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Habitacion> obtener(@PathVariable Long id) {
        return ResponseEntity.ok(habitacionService.obtenerPorId(id));
    }
}
