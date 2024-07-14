package com.backend.todolist.model;

import java.util.Arrays;
import java.util.List;

public class PredefinedTags {
    public static final List<String> TAGS = Arrays.asList("Pending", "In-Progress", "Completed");

    // Private constructor to prevent instantiation
    private PredefinedTags() {
        throw new IllegalStateException("Utility class");
    }
}