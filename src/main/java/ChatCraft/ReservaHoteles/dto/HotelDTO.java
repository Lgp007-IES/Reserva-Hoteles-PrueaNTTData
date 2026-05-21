package ChatCraft.ReservaHoteles.dto;

import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class HotelDTO {
    private Long idHotel;
    private String nombre;
    private String direccion;
    private Integer numeroHabitacion;
}
