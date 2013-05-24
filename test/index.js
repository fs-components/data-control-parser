
var expect = require('chai').expect
  , dataControlParser = require('data-control-parser');

describe('dataControlParser', function(){

  describe('when given a selector', function(){
    var node
      , nodeId = 'the-id'
      , controlName = 'mensch'
      , cfg;

    beforeEach(function(){
      node = document.createElement('div');
      node.id = nodeId;
      document.body.appendChild(node);
      node.setAttribute('data-control', controlName);
      cfg = dataControlParser('#' + nodeId);
    });
    beforeEach(function(){
    });
    afterEach(function(){
      node.parentNode.removeChild(node);
    });
    it('should find the node', function(){
      expect(cfg.container).to.equal(node);
    });
  });

  describe('when given a node', function(){
    var node
      , controlName = 'mensch'
      , cfg;
    beforeEach(function(){
      node = document.createElement('div');
      document.body.appendChild(node);
    });
 
    describe('but no dataAttr', function(){
      beforeEach(function(){
        node.setAttribute('data-control', controlName);
      });

      describe('and no config', function(){
        beforeEach(function(){
          cfg = dataControlParser(node);
        });

        it('should accept the node', function(){
          expect(cfg.container).to.equal(node);
        });

        it('should remove the "data-control" attr', function(){
          expect(cfg.container.getAttribute('data-control')).to.be.null;
        });

        it('should add the "data-control-init" attr', function(){
          expect(cfg.container.getAttribute('data-control-init')).to.eql(controlName);
        });
      });

      describe('with some config', function(){
        var config = {"a": "b", "c": 5};
        beforeEach(function(){
          node.setAttribute('data-config', JSON.stringify(config));
          cfg = dataControlParser(node);
        });
        it('should parse the config', function(){
          expect(Object.keys(cfg)).to.include.members(Object.keys(config));
        });
      });
    });
    describe('and a dataAttr of data-comp', function(){
      beforeEach(function(){
        node.setAttribute('data-comp', controlName);
        cfg = dataControlParser(node, 'data-comp');
      });

      it('should accept the node', function(){
        expect(cfg.container).to.equal(node);
      });

      it('should remove the "data-comp" attr', function(){
        expect(cfg.container.getAttribute('data-comp')).to.be.null;
      });

      it('should add the "data-control-init" attr', function(){
        expect(cfg.container.getAttribute('data-comp-init')).to.eql(controlName);
      });
    });

  });

});
    
