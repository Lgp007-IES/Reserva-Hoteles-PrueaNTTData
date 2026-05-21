package ChatCraft.ReservaHoteles;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ReservaHotelesApplication {

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(ReservaHotelesApplication.class);
        app.addInitializers(new DatabaseInitializer());
        app.run(args);
    }
}
