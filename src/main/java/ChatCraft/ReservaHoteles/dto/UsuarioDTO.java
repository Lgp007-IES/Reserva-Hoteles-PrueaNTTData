package ChatCraft.ReservaHoteles.dto;

import lombok.*;
import java.time.LocalDate;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class UsuarioDTO {
    private Long idUsuario;
    private String nombre;
    private String clave;
    private LocalDate fechaNacimiento;
}
