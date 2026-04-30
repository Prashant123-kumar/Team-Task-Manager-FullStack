package in.sp.main.repositories;

import in.sp.main.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByAssignedToId(Long userId);

    List<Task> findByProjectId(Long projectId);

    List<Task> findByStatus(String status);

    List<Task> findByAssignedToIdAndStatus(Long userId, String status);
}