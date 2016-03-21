/*
Contains all particle system presets, simple add a new particle function to expand preset selection

Particles that leave the edge of the canvas continue to be simulated until the svg duration expires
 */


particles = {

    leaves: function(mx, my, h, w, timeScale) {
        var rotation=0;
        for (var k = 0; k < 2; k++) {
            svg.append("svg:image")
                .attr("xlink:href","img/clover.svg")
                .attr("transform","rotate(" + rotation + ", " + mx + "," + my +")")
                .attr("cx",mx)
                .attr("cy",my)
                .attr("x",mx).attr("y",my)
                .attr('width', 24)
                .attr('height', 24)
                .attr("r", 10)
                .transition().duration(timeScale*600).ease(Math.sqrt).attr("x", mx+Math.floor(Math.random()*100)-100).attr("y",my+Math.floor(Math.random()*100)-100).attr("fill-opacity",0.9)
                .transition().duration(timeScale*600).ease(Math.sqrt).attr("x", mx+Math.floor(Math.random()*10)-10).attr("y",my+200).attr("fill-opacity",0.9)
                .remove();
                rotation+=60

        }
    },

    snow: function(mx, my, h, w, timeScale) {
        svg.append("svg:image")
            .attr("xlink:href",'img/snowflake.svg')
            .attr("x",mx).attr("y",my)
            .attr('width', 24)
            .attr('height', 24)
            .transition().duration(timeScale*600).ease(Math.sqrt).attr("x", mx+Math.floor(Math.random()*125)+150).attr("y",my+Math.floor(Math.random()*100)+100).attr("fill-opacity",0.9)
            .transition().duration(timeScale*600).ease(Math.sqrt).attr("x", mx+Math.floor(Math.random()*-10)-10).attr("y",my+200).attr("fill-opacity",0.9)
            .remove();

    },

    insects: function(mx, my, h, w, timeScale) {
        var rotation=0;
        for (var k = 0; k < 4; k++) {
            svg.append("image")
                .attr("xlink:href", "img/insect.png")
                .attr("x", mx).attr("y", my)
                .attr('width', 24)
                .attr('height', 24)
                .attr("transform", "rotate(" + rotation + ", " + mx + "," + my + ")")
                .attr("cx", mx)
                .attr("cy", my)
                .attr("r", 10)
                .transition().duration(timeScale*600).ease(Math.sqrt).attr("x", mx+Math.floor(Math.random()*150)-100).attr("y",my+Math.floor(Math.random()*100)-100).attr("fill-opacity",0.9)
                .transition().duration(timeScale*600).ease(Math.sqrt).attr("x", mx+Math.floor(Math.random()*15)-10).attr("y",my+100).attr("fill-opacity",0.9)
                .remove();
                rotation += 60;
            }
        }
};
