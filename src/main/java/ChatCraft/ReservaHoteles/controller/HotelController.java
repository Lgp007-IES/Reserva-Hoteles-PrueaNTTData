package ChatCraft.ReservaHoteles.controller;

import ChatCraft.ReservaHoteles.dto.HotelDTO;
import ChatCraft.ReservaHoteles.model.Hotel;
import ChatCraft.ReservaHoteles.service.HotelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hoteles")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class HotelController {

    private final HotelService hotelService;

    @GetMapping
    public ResponseEntity<List<Hotel>> listar() {
        return ResponseEntity.ok(hotelService.listarHoteles());
    }

    @PostMapping
    public ResponseEntity<Hotel> crear(@RequestBody HotelDTO dto) {
        return ResponseEntity.ok(hotelService.crearHotel(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hotel> obtener(@PathVariable Long id) {
        return ResponseEntity.ok(hotelService.obtenerPorId(id));
    }
}
