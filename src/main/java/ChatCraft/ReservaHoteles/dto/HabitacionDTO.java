package ChatCraft.ReservaHoteles.dto;

import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class HabitacionDTO {
    private Long idHabitacion;
    private Integer tiempoAlquiler;
    private Integer capacidad;
    private Double precio;
    private Long idHotel;
}
