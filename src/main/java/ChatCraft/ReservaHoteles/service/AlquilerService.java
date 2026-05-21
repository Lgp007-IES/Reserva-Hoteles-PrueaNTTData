package ChatCraft.ReservaHoteles.service;

import ChatCraft.ReservaHoteles.dto.AlquilerDTO;
import ChatCraft.ReservaHoteles.model.*;
import ChatCraft.ReservaHoteles.repository.AlquilerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlquilerService {

    private final AlquilerRepository alquilerRepository;
    private final UsuarioService usuarioService;
    private final HotelService hotelService;
    private final HabitacionService habitacionService;

    public List<Alquiler> listarAlquileres() {
        return alquilerRepository.findAll();
    }

    public Alquiler crearAlquiler(AlquilerDTO dto) {
        Usuario usuario = usuarioService.obtenerPorId(dto.getIdUsuario());
        Hotel hotel = hotelService.obtenerPorId(dto.getIdHotel());
        Habitacion habitacion = habitacionService.obtenerPorId(dto.getIdHabitacion());

        Alquiler alquiler = new Alquiler();
        alquiler.setUsuario(usuario);
        alquiler.setHotel(hotel);
        alquiler.setHabitacion(habitacion);
        alquiler.setFechaEntrada(dto.getFechaEntrada());
        alquiler.setFechaSalida(dto.getFechaSalida());

        return alquilerRepository.save(alquiler);
    }
}
