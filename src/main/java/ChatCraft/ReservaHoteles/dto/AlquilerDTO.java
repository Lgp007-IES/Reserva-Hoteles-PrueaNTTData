package ChatCraft.ReservaHoteles.dto;

import lombok.*;
import java.time.LocalDate;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class AlquilerDTO {
    private Long idAlquiler;
    private Long idUsuario;
    private Long idHotel;
    private Long idHabitacion;
    private LocalDate fechaEntrada;
    private LocalDate fechaSalida;
}
