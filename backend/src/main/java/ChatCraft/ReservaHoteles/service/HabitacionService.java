package ChatCraft.ReservaHoteles.service;

import ChatCraft.ReservaHoteles.dto.HabitacionDTO;
import ChatCraft.ReservaHoteles.model.Habitacion;
import ChatCraft.ReservaHoteles.model.Hotel;
import ChatCraft.ReservaHoteles.repository.HabitacionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HabitacionService {

    private final HabitacionRepository habitacionRepository;
    private final HotelService hotelService;

    public List<Habitacion> listarHabitaciones() {
        return habitacionRepository.findAll();
    }

    public Habitacion crearHabitacion(HabitacionDTO dto) {
        Hotel hotel = hotelService.obtenerPorId(dto.getIdHotel());
        Habitacion habitacion = new Habitacion();
        habitacion.setTiempoAlquiler(dto.getTiempoAlquiler());
        habitacion.setCapacidad(dto.getCapacidad());
        habitacion.setPrecio(dto.getPrecio());
        habitacion.setHotel(hotel);
        return habitacionRepository.save(habitacion);
    }

    public Habitacion obtenerPorId(Long id) {
        return habitacionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Habitacion no encontrada con id: " + id));
    }
}
