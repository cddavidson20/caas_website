from model.vehicle import VehicleModel
import json

class VehicleTests():
    v="SAJWA43B675B11360"
    car = ""
    def __init__(self,v):       
        self.v = v
        self.car = VehicleModel(v)
        
    #Designed to always fail to test things
    def test_fail(self):
        print("test_fail")
        print("tests if test is working")
        if 0 != 2:
            result = "PASS"
        print(result)
    def test_vinlength(self):
        print("test_vin length")
        print("if vin length is 17 vin will pass")
        print("\t(only valid 1981 and later)")

        result= "TRUE"  
        if len(self.v) != 17:
            result = "PASS"            
        print("\t"+result)
        
    def test_jsonout(self):
        print("checking output of json")
        print("validates make model year and vin")        
        a,b,c,d = self.car.make,self.car.model,self.car.model_year,self.car.vin
        result = "PASS"
        if self.test_emptystr("")>0:
            print("\tempty string test success")
        if self.test_emptystr(a)>0:
            print("\tERROR missing value for make")
        else:
            print("\tMake is "+a)
        if self.test_emptystr(b)>0:
            print("\tERROR missing value for model")
        else:
            print("\tModel is "+b)
        if self.test_emptystr(c)>0:
            print("\tERROR missing value for year")
        else:
            if self.test_yearlength(c)>0:
                print("\tERROR Invalid year") 
            else:
                print("\tYear "+c+" is valid");
        if self.test_emptystr(d)>0:
            print("\tERROR missing value for vin")
        else:
             if self.testvin(d,c)>0:
                print("\tIllegal characters in vin")
             else:
                print(d+" is a valid vin")


		
    def test_yearlength(self,yr):
        print("test year length")
        res = 0
        if len(yr) != 4:
            res =1
        return res
        
    def testvin(self,d,yr):
        print("test vin for illegal characters i o q and u z 0 at position 9")
        res = 0
        x = 0
        try:
            x = int(yr)
        except ValueError:
            print("Year is not a number")
        illegal = ["I","O","Q","U","Z","0"]
        if x>1980:
            for f in range(0,3):
                 if d.find(illegal[f]) > -1:
                    print("\tillegal character " + illegal[f] + " found")
                    res = res + 1
                 else:
                    print("\tillegal characters "+illegal[f]+" not found")	
            for f in range(0,3):
                nine = d[9:10]
                print("\tchecking position nine model year which is " + nine)
                if nine.find(illegal[f+3]) > -1:
                    print("\tillegal character " + illegal[f+3] + " found")
                    res = res + 1
                else:
                    print("\tillegal characters "+illegal[f+3]+" not found")					

        else:
            print("vin is pre 1981 and cannot be validated")            
        return res
    
    def test_emptystr(self,v):
        z = ""
        res = 0
        if len(v)>len(z):
            res = 0
        else:
            res = 1
        return res
    
    
if __name__ == '__main__':
    vtester = VehicleTests("SAJWA43B675B11360")
    print(vtester)
    vtester.test_fail()
    vtester.test_vinlength()
    
    #jsonout will test all the values model make year and also will validate the vin
    vtester.test_jsonout()

    print("testing with invalid vin")
    vtester = VehicleTests("IOQUZ0")
    vtester.test_jsonout()
    print(vtester)
    
