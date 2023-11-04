if __name__=='__main__':
    for _ in range(int(input())):
        x, y = input().split()
        sum1 = 0
        for i in range(len(x)):
            add1 = 0      
            for j in range(len(y)):
                add2 = 0      
               
                for k in range(int(x[i])):
                    add2 += int(y[j])
                
                for k in range(1, len(x)-i):
                    add2 = int('{0}0'.format(add2))
                for k in range(1, len(y)-j):
                    add2 = int('{0}0'.format(add2))
                add1 += add2
            sum1 += add1

        print(sum1)
# print hello word in python
 
# write a methode to count how many 1s in the binary representation of a 32-bit integer.
 
# input:  n = 9
# output: 1  
  

