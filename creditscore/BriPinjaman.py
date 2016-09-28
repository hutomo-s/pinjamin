from sys import argv
import pandas as pd
import prettytable
from StringIO import StringIO


"""
pokok pinjaman
bunga per tahun
jatuh tempo / tenor pinjaman
jenis bunga:
    flat
    floating
"""

#menghitung bunga bank (flat)
#tenor pinjaman dalam tahun, bunga dalam tahun
#def perhitungan_bunga_bank(pokok_pinjaman,bunga,tenor_pinjaman):
#    total_bunga = pokok_pinjaman * float(bunga/100) * tenor_pinjaman
#    return total_bunga

#menghitung bayaran per bulan
#def angsuran_per_bulan(pokok_pinjaman,tenor_pinjaman,total_bunga):
#    angsuran = (pokok_pinjaman/(tenor_pinjaman*12))+(total_bunga/12)
#    return angsuran


"""
payment history
amounts owed
lenght of credit history
credit mix in use
new credit
"""

"""
existing account
duration have bank account
credit history (no credits taken,all credits at this bank paid back duly,existing credits paid back duly till now,delay in paying off in the past)
purpose
credit amount
employment (xx years/unemployment)
housing
"""

###menghitung trust score

##untuk mengubah ke category
##smua masukanny bentukny list

#untuk menghitung payment history
def payment_history(cashier_id,whitelist,created_at):
    payment_history_score = []
    for x in list(set(cashier_id)):
        temp_whitelist = []
        temp_created_at = []
        for y in range(len(cashier_id)):
            if cashier_id[y] == x:
                temp_whitelist.append(whitelist[y])
                temp_created_at.append(created_at[y])
        for y in range(len(temp_whitelist)):
            if temp_whitelist[y] == 'N':
                payment_history_score.append(int((max(temp_created_at)-temp_created_at[y]).days))
            else:
                payment_history_score.append(0)
    payment_history_score = pd.DataFrame(data=payment_history_score,columns=['payment_history'])
    payment_history_score['cashier_id'] = pd.Series(cashier_id, index=payment_history_score.index,dtype=int)
    payment_history_score = payment_history_score.groupby('cashier_id')
#    payment_history_score['cashier_id']=payment_history_score['cashier_id'].astype(int)
    payment_history_score = payment_history_score.max()
    series = payment_history_score['payment_history'].astype(int)
    def change_to_category_value(x):
        if x == 0:
            return 75
        elif x >= 1 and x <= 150:
            return 10
        elif x >= 151 and x <= 330:
            return 15
        elif x >= 331 and x <= 690:
            return 25
        elif x >= 691:
            return 55
    series = series.apply(change_to_category_value)
    payment_history_score['score'] = series
    def change_to_int(x):
        y = int(x)
        return y
        
#    payment_history_score.apply(change_to_int)
    return payment_history_score

#untuk menghitung new credit
def new_credit(ids,cashier_id,new_credit):
    new_credit_score_dataframe = pd.DataFrame(columns=('cashier_id', 'new_credit'))
    list_cashier_id = list(set(cashier_id))
    for x in range(len(list_cashier_id)):
        temp_id = []
        for y in range(len(cashier_id)):
            if cashier_id[y] == list_cashier_id[x]:
                temp_id.append(ids[y])
#            lookup=max(temp_id)    
        new_credit_score_dataframe.loc[x] = [int(list_cashier_id[x]),new_credit[max(temp_id)-1]]
    def change_to_category_value(x):
        if x == 0:
            return 70
        elif x == 1:
            return 60
        elif x == 2:
            return 45
        elif x == 3:
            return 25
        elif x >= 4:
            return 20
    new_credit_score_dataframe['score'] = new_credit_score_dataframe['new_credit'].apply(change_to_category_value)
    return new_credit_score_dataframe

#untuk menghitung outstanding debt
def outstanding_debt(ids1,ids2,cashier_id,outstanding_debt,saldo):
    outstanding_debt_dataframe = pd.DataFrame(columns=('cashier_id', 'outstanding_debt'))
    saldo_dataframe = pd.DataFrame(columns=['saldo'])
    list_cashier_id = list(set(cashier_id))
    for x in range(len(list_cashier_id)):
        temp_id = []
        for y in range(len(cashier_id)):
            if cashier_id[y] == list_cashier_id[x]:
                temp_id.append(ids1[y])
        outstanding_debt_dataframe.loc[x] = [int(list_cashier_id[x]),outstanding_debt[max(temp_id)-1]]
    for x in range(len(list_cashier_id)):
        temp_id = []
        for y in range(len(cashier_id)):
            if cashier_id[y] == list_cashier_id[x]:
                temp_id.append(ids2[y])
        saldo_dataframe.loc[x] = [saldo[max(temp_id)-1]]
    outstanding_debt_dataframe['saldo'] = pd.Series(list(saldo_dataframe['saldo'].astype(int)), index=saldo_dataframe.index,dtype=int)
    def change_to_category_value(debt,saldo):
        if debt == None:
            return 30
        elif debt == 0:
            return 55
        elif (saldo-debt)/saldo >= 0.9:
            return 65
        elif (saldo-debt)/saldo >= 0.8:
            return 50
        elif (saldo-debt)/saldo >= 0.7:
            return 40
        else:
            return 0
    outstanding_debt_dataframe['score'] = outstanding_debt_dataframe.apply(lambda row: change_to_category_value(row['outstanding_debt'],row['saldo']),axis=1)
    return outstanding_debt_dataframe

#untuk menghitung credit mix
def credit_mix(pinjaman):
    credit_mix_dataframe = pd.DataFrame(data=pinjaman)
    def change_to_category_value(jenis_pinjaman):
        if jenis_pinjaman == 'kredit konsumtif':
            return 15
        if jenis_pinjaman == 'kredit rumah':
            return 25
        if jenis_pinjaman == 'kredit modal kerja':
            return 50
        if jenis_pinjaman == 'kredit investasi':
            return 60
    credit_mix_dataframe['score'] = credit_mix_dataframe['jenis_pinjaman'].apply(change_to_category_value)
    credit_mix_score = credit_mix_dataframe[['cashier_id','jenis_pinjaman','score']]
    return credit_mix_score


#total untuk penggabungan trust score
def trust_score():
    payment_hist = pd.read_csv('/Users/donisurya/odrive/Google Drive (2)/Project/BRI Challenge/data_dummy_payment_history.csv') 
    data_new_credit = pd.read_csv('/Users/donisurya/odrive/Google Drive (2)/Project/BRI Challenge/data_dummy_new_credit.csv')
    data_outstanding_debt = pd.read_csv('/Users/donisurya/odrive/Google Drive (2)/Project/BRI Challenge/data_dummy_outstanding_debt.csv')
    data_saldo = pd.read_csv('/Users/donisurya/odrive/Google Drive (2)/Project/BRI Challenge/data_dummy_saldo.csv')
    data_credit_mix = pd.read_csv('/Users/donisurya/odrive/Google Drive (2)/Project/BRI Challenge/data_dummy_pinjaman.csv')

    score_payment_history = payment_history(cashier_id=list(payment_hist['cashier_id'].astype(int)),whitelist=list(payment_hist['whitelist'].astype(str)),created_at=list(pd.to_datetime(payment_hist['created_at'])))
    score_new_credit = new_credit(ids=list(data_new_credit['id'].astype(int)),cashier_id=list(data_new_credit['cashier_id'].astype(int)),new_credit=list(data_new_credit['new_credit'].astype(int)))
    score_outstanding_debt = outstanding_debt(ids1=list(data_outstanding_debt['id'].astype(int)),ids2=list(data_saldo['id'].astype(int)),cashier_id=list(data_outstanding_debt['cashier_id'].astype(int)),outstanding_debt=list(data_outstanding_debt['outstanding_debt'].astype(int)),saldo=list(data_saldo['saldo'].astype(int)))
    score_credit_mix = credit_mix(data_credit_mix)
    total_score = pd.DataFrame(columns=('cashier_id', 'total_score'))
    total_score['cashier_id'] = pd.Series(list(score_new_credit['cashier_id'].astype(int)), index=score_new_credit.index,dtype=int)
    total_score_process = [x + y + z + a for x, y, z, a in zip(list(score_payment_history['score']), list(score_new_credit['score']),list(score_outstanding_debt['score']),list(score_credit_mix['score']))]
    total_score['total_score'] = total_score_process
    total_score['total_score'] = total_score['total_score'].apply(lambda row: format(round(row/float(270),2)))
#    total_score = score_payment_history[['cashier_id']]
#    df = pd.read_csv('/Users/donisurya/Desktop/trust_score.csv')
#    temp = []    
#    try:    
#        for x in range(len(types)):
#            search_pandas = df[(df['type']==types[x])& (df['category']==category[x])]
#            temp.append(int(search_pandas['value']))
#    except:
#        print "category terlalu besar"
#    score = sum(temp)
#    sum(df['value'])
#    return score_new_credit,score_payment_history,score_outstanding_debt,score_credit_mix,total_score
    return total_score
#    return score_payment_history
#
#types = ['payment_history','outstanding_debt']
#category = [3,1]
#print trust_score(types,category)


def main(argv):
#    pokok_pinjaman = int(raw_input("Pokok pinjaman (Rp): "))
#    pokok_pinjaman = 120000000
#    tenor_pinjaman = int(raw_input("Tenor pinjaman (tahun): "))
#    tenor_pinjaman = 1
#    bunga = float(raw_input("Bunga (%): "))
#    types = []
#    category = []
#    for x in range(10):
#        input_types = str(raw_input("Type for trust score (payment_history,outstanding_debt,credit_history_length,pursuit_of_new_credit,credit_mix): "))
#        types.append(input_types)
#        input_category = int(raw_input("Category for trust score "+str(input_types)+": "))
#        category.append(input_category)
#        for_break = str(raw_input("Break [Y/N]: "))
#        if for_break == 'Y':
#            break
#    total_bunga = perhitungan_bunga_bank(pokok_pinjaman,bunga,tenor_pinjaman)
#    angsuran = angsuran_per_bulan(pokok_pinjaman,tenor_pinjaman,total_bunga)
    score = trust_score()
#    print "Total bunga: "+str(total_bunga)
#    print "Angsuran: "+str(angsuran)
#    for x in score:    
#        output = StringIO()
#        x.to_csv(output)
#        output.seek(0)
#        pt = prettytable.from_csv(output)
#        print "Trust score: "+str(pt)

    output = StringIO()
    score.to_csv(output)
    output.seek(0)
    pt = prettytable.from_csv(output)
    print "Trust score: "+str(pt)
    
if __name__=="__main__":
    main(argv)