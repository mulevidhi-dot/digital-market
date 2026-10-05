const SUPABASE_URL = "https://jiegmqtzdttuxcxnwjya.supabase.co";

const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppZWdtcXR6ZHR0dXhjeG53anlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwMDIyMDIsImV4cCI6MjEwNjU3ODIwMn0.1yHfTB5OMC99S8_-rfzE3KgnDwePJIpCNN8Uzx32i80";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );
