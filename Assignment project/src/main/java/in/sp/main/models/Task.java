package in.sp.main.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Task title is required")
    private String title;

    private String description;

    private String status; // TODO, IN_PROGRESS, DONE, OVERDUE

    private LocalDate dueDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User assignedTo;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    // Auto-check overdue before DB save
    @PrePersist
    @PreUpdate
    public void checkOverdue() {
        if (dueDate != null
                && LocalDate.now().isAfter(dueDate)
                && !"DONE".equals(status)) {
            this.status = "OVERDUE";
        }
    }
}