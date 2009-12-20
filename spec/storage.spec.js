
describe 'z.storage'
  before_each
    if(localStorage) {
        localStorage.test="";
    }
  end


  describe '.setLocal()'
    it 'should work whether browser supports localStorage or not'
       z.storage.setLocal("test", {a:"testing.."});
       if(localStorage) {
			localStorage.test.should.be_a String
	   }
	   else {
	    localStorage.should.be_undefined
	   }
    end

    it 'should save an object to localStorage when available'

		if(localStorage) {
			localStorage.test.should.equal ""

            z.storage.setLocal("test", {a:"testing.."});

            localStorage.test.should.be_a String

            if(JSON)
                JSON.parse(localStorage.test).should.have_property 'a', "testing.."
       }

    end
  end

  describe '.getLocal()'
    it 'should should retrieve an object from localStorage correctly'
       if(localStorage) {
			localStorage.test="hi"

			z.storage.getLocal("test").should.be_a String

			localStorage.test=JSON.stringify({});

			z.storage.getLocal("test").should.be_a Object
		}
    end
  end

end

