package com.example.DemoApp;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class GreetingController {

    @GetMapping("/calendar")
    public String calendar(Model model) {
        return "calendar";
    }

    @GetMapping("/moreEvent")
    public String moreEvent(Model model) {
        return "event";
    }
    @GetMapping("/addEvent")
    public String addEvent(Model model) {
        return "addEvent";
    }

}
