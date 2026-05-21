package ChatCraft.ReservaHoteles.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "habitaciones")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Habitacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_habitacion")
    private Long idHabitacion;

    @Column(name = "tiempo_alquiler")
    private Integer tiempoAlquiler;

    @Column(nullable = false)
    private Integer capacidad;

    @Column(nullable = false)
    private Double precio;

    @ManyToOne
    @JoinColumn(name = "id_hotel", nullable = false)
    private Hotel hotel;

    @JsonIgnore
    @OneToMany(mappedBy = "habitacion", cascade = CascadeType.ALL)
    private List<Alquiler> alquileres;
}
