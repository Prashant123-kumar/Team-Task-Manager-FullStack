package in.sp.main.controllers;

import in.sp.main.models.Project;
import in.sp.main.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*") // Frontend connectivity ke liye
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    @PostMapping("/create")
    public Project createProject(@RequestBody Project project) {
        return projectRepository.save(project);
    }

    @GetMapping("/all")
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }
}