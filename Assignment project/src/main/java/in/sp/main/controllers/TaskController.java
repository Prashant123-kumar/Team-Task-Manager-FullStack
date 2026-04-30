package in.sp.main.controllers;

import in.sp.main.models.Task;
import in.sp.main.repositories.TaskRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @PostMapping("/assign")
    public ResponseEntity<Task> assignTask(@Valid @RequestBody Task task) {
        // Mark overdue on creation if dueDate already passed
        if (task.getDueDate() != null
                && LocalDate.now().isAfter(task.getDueDate())
                && !"DONE".equals(task.getStatus())) {
            task.setStatus("OVERDUE");
        } else if (task.getStatus() == null) {
            task.setStatus("TODO");
        }
        return ResponseEntity.ok(taskRepository.save(task));
    }

    @GetMapping("/user/{userId}")
    public List<Task> getUserTasks(@PathVariable Long userId) {
        return taskRepository.findByAssignedToId(userId);
    }

    @GetMapping("/project/{projectId}")
    public List<Task> getProjectTasks(@PathVariable Long projectId) {
        return taskRepository.findByProjectId(projectId);
    }

    @GetMapping("/overdue")
    public List<Task> getOverdueTasks() {
        return taskRepository.findByStatus("OVERDUE");
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Task> updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        task.setStatus(status);
        return ResponseEntity.ok(taskRepository.save(task));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable Long id) {
        if (!taskRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        taskRepository.deleteById(id);
        return ResponseEntity.ok("Task deleted!");
    }
}