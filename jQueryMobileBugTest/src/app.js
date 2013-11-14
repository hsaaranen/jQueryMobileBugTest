$(document).ready(function() {

    var SettingsView = Backbone.View.extend({
        template: _.template($("#settings-tpl").html()),
        events: {
            'click #button' : 'gotoGraph'
        },

        initialize: function() {
            this.render();
        },

        render: function() {      
            this.$el.html(this.template);
        },
        
        gotoGraph: function() {
            
        }

    });

    GraphView = Backbone.View.extend({
        tagName: 'div',
        template: _.template($("#graph-tpl").html()),
        stageTemplate: $("div"),
        stage: null,
        staticLayer: null,
        draggableLayer: null,
        background: null,
        circle: null,
        initialize: function () {
            this.initializeStage();
            this.render();
        },
        
        initializeStage: function () {
            var view = this;

            this.stage = new Kinetic.Stage({                
                container: view.stageTemplate[0],
                width: 600,
                height: 600
            });
            
            this.draggableLayer = new Kinetic.Layer({ draggable: true, dragOnTop: false });
            this.staticLayer = new Kinetic.Layer({ draggable: false, listening: false });

            this.background = new Kinetic.Rect({
                stroke: 'black',
                fill: 'blue',
                strokeWidth: 1,
                width: 200,
                height:200
            });

            this.circle = new Kinetic.Circle({                
                radius: 30,
                stroke: 'black',
                strokeWidth: 1,
                fill: 'red',
                x: 85,
                y: 85
            });

            this.stage.add(this.staticLayer);
            this.stage.add(this.draggableLayer);
            this.staticLayer.add(this.background);
            this.draggableLayer.add(this.circle);
                      
        },

        render: function () {
            this.$el.find('#graph-container').html(this.stageTemplate);
            this.$el.html(this.template);           
            this.stage.draw();  
        }
        
    });

    var graph_view = new GraphView({ el: $("#graph-container") });
    var settings_view = new SettingsView({ el: $("#settings-container") });
});