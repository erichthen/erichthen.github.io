$(document).ready(function () {
    // hide sections on page load
    $(".section-content").hide();

    // fade in default on page load
    $("#home").fadeIn(2500);

    // section switching through nav bar with fade effect
    $(".nav-link").click(function () {
        let sectionToShow = $(this).attr("data-section");
        $(".section-content").hide();
        $("#" + sectionToShow).fadeIn(2500);
    });

    // slideshow functionality
    let slideshows = [
        {
            container: "#slideshow-container-1",
            imgElement: "#slideshow-img-1",
            captionElement: "#slideshow-caption-1",
            images: [
                { src: "images/bedroom.jpg", caption: "The comfort and familiarity of your bedroom is perfect for meditation." },
                { src: "images/beach.jpg", caption: "The beach is where I have had my most profoud meditations. If accessible, I highly reccomend." },
                { src: "images/retreat.jpg", caption: "Meditation can be more powerful with others, a retreat is the perfect opportunity for this." },
                { src: "images/church.jpg", caption: "If you're religious, establishments are a great choice for a good connection with self." },
                { src: "images/bed.jpg", caption: "Lot's of meditations require you to lie down. Get in your bed and meditate before you sleep!" },
                { src: "images/scenery.jpg", caption: "There is something powerful about your thoughts when you are overlooking beautiful scenery." }
            ],
            index: 0
        },
        {
            container: "#slideshow-container-2",
            imgElement: "#slideshow-img-2",
            captionElement: "#slideshow-caption-2",
            images: [
                { src: "images/city.jpg", caption: "Avoid loud chaotic environments like a bench on a city street, unless you want a challenge!" },
                { src: "images/office.jpg", caption: "The office. Not only do you have work to do, but there are too many distractions and stressors." },
                { src: "images/bear.jpg", caption: "Unsafe locations, such as a parks known for having bears. Not a good place to let your guard down!" },
                { src: "images/anxious.jpg", caption: "Avoid places that you have bad associations with. This can lead to counterproductive anxiety." },
                { src: "images/pickpocket.jpg", caption: "Watch out for crowds. While you're observing your thoughts, someone might be observing your wallet!"},
                { src: "images/sitting-street.jpg", caption: "Not that you were planning on it, but meditating in the middle of the steet isn't the brightest of ideas." }
            ],
            index: 0
        }
    ];

    function nextImage(slideshow) {
        slideshow.index = (slideshow.index + 1) % slideshow.images.length; // wrap around after last image

        $(slideshow.imgElement).fadeOut(1000, function () {
            $(this).attr("src", slideshow.images[slideshow.index].src).fadeIn(1000);
        });

        $(slideshow.captionElement).fadeOut(1000, function () {
            $(this).text(slideshow.images[slideshow.index].caption).fadeIn(1000);
        });
    }

    setInterval(() => {
        slideshows.forEach(nextImage);
    }, 9000); // images change every 3 sec

    const meditationData = {
        "mindfulness": {
            image: "images/mind.jpg",
            steps: [
                "Find a quiet place and sit comfortably.",
                "Focus on your breath as it moves in and out. Keep your breath as consistent as possible.",
                "Then, focus on your senses. What do you see? Hear? Smell? Observe your reaction.",
                "Bring your attention back to your breath.",
                "Repeat and continue this for at least 5-10 minutes."
            ],
            caption: "I like to do mindfulness meditation in nature and listen to the birds."
        },
        "breath": {
            image: "images/breath.jpg",
            steps: [
                "Sit comfortably with a straight back and eyes closed.",
                "Close your eyes and take a deep breath in through your nose.",
                "Hold your breath for a moment, then exhale slowly.",
                "Repeat while focusing on each breath.",
                "Continue for several minutes, gradually deepening your relaxation."
            ],
            caption: "Feeling your lungs expand and contract will help improve your breath awareness."
        },
        "mantra": {
            image: "images/mantra.jpg",
            steps: [
                "Choose a word or phrase to repeat.",
                "Find a quiet space, sit comfortably with your back straight.",
                "Close your eyes and begin repeating the mantra softly or in your mind.",
                "Stay focused on the sound and rhythm of your mantra.",
                "If your mind wanders, gently return to the mantra."
            ],
            caption: "A person may perform mantra meditation with or without religious content."
        },
        "transcendental": {
            image: "images/transcend.jpg",
            steps: [
                "Sit comfortably with your eyes closed and back straight.",
                "Silently repeat a specific mantra given by an instructor.",
                "Observe your thoughts, then gently focus back on the mantra.",
                "Continue for about 20 minutes.",
                "Gently bring your awareness back to the present moment."
            ],
            caption: "Transcendental meditation is the more spiritual than the other types here."
        },
        "love": {
            image: "images/love.jpg",
            steps: [
                "Call to mind things good things you have done.",,
                "Silently repeat phrases like 'May I be happy. May I be healthy.'",
                "Repeat steps 1 and 2, but for a loved one.",
                "Gradually extend these loving thoughts to yourself and others.",
                "Again, be kind to yourself when distracted. Try to avoid frustration."
            ],
            caption: "Mentally pat yourself on the back throughout loving-kindness meditation."
        },
        "body": {
            image: "images/body.jpg",
            steps: [
                "Lie down in a quiet and comfortable place.",
                "Close your eyes and take deep, consistent breaths.",
                "Bring your attention to your toes, noticing any sensations.",
                "Slowly move your awareness up through your body, relaxing each part.",
                "End by resting in full-body awareness and relaxation."
            ],
            caption: "I like doing body scan meditations on my bed to enhance relaxation."
        }
    };

    // dynamically show respective images, steps, and captions on the "how" page
    // when a meditation type button is clicked
    $(".meditation-btn").click(function () {

        $(".meditation-btn").removeClass("selected");
        $(this).addClass("selected");

        let type = $(this).data("type"); 

        $("#meditation-image").attr("src", meditationData[type].image);

        $("#meditation-caption").text(meditationData[type].caption);

        // remove old list, show new one
        $("#meditation-steps ol").empty();
        meditationData[type].steps.forEach((step, index) => {
            $("#meditation-steps ol").append(`<li style="display: none;">${step}</li>`);
        });

        // dynamically style image, steps, and caption
        $("#meditation-image").css({ "left": "-100%", "display": "block" });
        $("#meditation-caption").css({ "opacity": "0" });
        $("#meditation-steps").css({ "right": "-100%", "display": "block" });

        // slide image on screen from left
        $("#meditation-image").animate({ left: "0" }, 1500, function () {
            // fade in the figcaption after the image animation
            $("#meditation-caption").fadeTo(100, 1);
        });

        // slide steps from <ol> on screen from right
        $("#meditation-steps").animate({ right: "0" }, 2000, function () {
            // do this sequentially
            $("#meditation-steps li").each(function (index) {
                $(this).delay(index * 700).fadeIn(750);
            });
        });
    });

    // moving images across the screen from left to right in the "why" page
    function moveImage(figure, startDelay) {
        let speed = 40000; 
        let screenWidth = $(window).width();
        let figureWidth = $(figure).outerWidth();
        let startPosition = -figureWidth * 2; // start to the left of the screen
        let endPosition = screenWidth + figureWidth; 

        function animateFigure() {
            $(figure).css({ left: startPosition }); // reset position to the left
            $(figure).animate(
                { left: endPosition },
                speed,
                "linear",
                function () {
                    animateFigure(); // restart at end
                }
            );
        }

        setTimeout(animateFigure, startDelay);
    }

    moveImage("#why-figure-1", 0); 
    moveImage("#why-figure-2", 11111); 

    // slowly fade in the image with the bench in the sun on "schedule" page
    $("#schedule-image").css("opacity", "0").fadeTo(5000, 1);

    // do the same thing when schedule button is clicked
    $("#schedule-btn").click(function () {
        $("#schedule-image").css("opacity", "0").fadeTo(5000, 1);
    });
});