package com.example.DemoApp;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@org.springframework.stereotype.Controller
public class Controller {

    @GetMapping("/moreEvent")
    public String moreEvent(Model model) {
        return "event";
    }
    @GetMapping("/addEvent")
    public String addEvent(Model model) {
        return "addEvent";
    }

}
