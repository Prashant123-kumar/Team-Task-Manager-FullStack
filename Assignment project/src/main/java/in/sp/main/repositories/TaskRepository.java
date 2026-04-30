package in.sp.main.repositories;

import in.sp.main.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    // Specific user ko assigned tasks nikalne ke liye
    List<Task> findByAssignedToId(Long userId);
}