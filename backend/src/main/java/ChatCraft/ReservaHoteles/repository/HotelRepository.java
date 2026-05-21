package ChatCraft.ReservaHoteles.repository;

import ChatCraft.ReservaHoteles.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long> {
}
