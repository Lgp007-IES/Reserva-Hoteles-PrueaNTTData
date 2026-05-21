package ChatCraft.ReservaHoteles.service;

import ChatCraft.ReservaHoteles.dto.HotelDTO;
import ChatCraft.ReservaHoteles.model.Hotel;
import ChatCraft.ReservaHoteles.repository.HotelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HotelService {

    private final HotelRepository hotelRepository;

    public List<Hotel> listarHoteles() {
        return hotelRepository.findAll();
    }

    public Hotel crearHotel(HotelDTO dto) {
        Hotel hotel = new Hotel();
        hotel.setNombre(dto.getNombre());
        hotel.setDireccion(dto.getDireccion());
        hotel.setNumeroHabitacion(dto.getNumeroHabitacion());
        return hotelRepository.save(hotel);
    }

    public Hotel obtenerPorId(Long id) {
        return hotelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hotel no encontrado con id: " + id));
    }
}
