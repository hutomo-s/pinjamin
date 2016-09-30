from sys import argv
import pandas as pd
import prettytable
from StringIO import StringIO
import pymysql
from datetime import datetime

db_mysql = pymysql.connect(host="127.0.0.1",
                      port=8889,
                            user="root",
                            charset="utf8",
                            password="root",
                            db="pinjamin_v2")
cursor = db_mysql.cursor()

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

def upload_data(query):
    dataframe = pd.read_sql(sql=query,con=db_mysql)
    return dataframe

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
            if temp_whitelist[y] == 0:
                payment_history_score.append(int((max(temp_created_at)-temp_created_at[y]).days))
            else:
                payment_history_score.append(0)
    payment_history_score = pd.DataFrame(data=payment_history_score,columns=['payment_history'])
    payment_history_score['cashier_id'] = pd.Series(cashier_id, index=payment_history_score.index,dtype=int)
    payment_history_score = payment_history_score.groupby('cashier_id')
#    payment_history_score['cashier_id']=payment_history_score['cashier_id'].astype(int)
    payment_history_score = payment_history_score.max()
    series = payment_history_score['payment_history'].astype(int)
#    print series
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
#    print payment_history_score
    def change_to_int(x):
        y = int(x)
        return y
    return payment_history_score

##untuk menghitung new credit -> ini diilangin aja
#def new_credit(ids,cashier_id,new_credit):
#    new_credit_score_dataframe = pd.DataFrame(columns=('cashier_id', 'new_credit'))
#    list_cashier_id = list(set(cashier_id))
#    for x in range(len(list_cashier_id)):
#        temp_id = []
#        for y in range(len(cashier_id)):
#            if cashier_id[y] == list_cashier_id[x]:
#                temp_id.append(ids[y])
#        new_credit_score_dataframe.loc[x] = [int(list_cashier_id[x]),new_credit[ids.index(max(temp_id))]]
#    def change_to_category_value(x):
#        if x == 0:
#            return 70
#        elif x == 1:
#            return 60
#        elif x == 2:
#            return 45
#        elif x == 3:
#            return 25
#        elif x >= 4:
#            return 20
#    new_credit_score_dataframe['score'] = new_credit_score_dataframe['new_credit'].apply(change_to_category_value)
#    return new_credit_score_dataframe

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
        outstanding_debt_dataframe.loc[x] = [int(list_cashier_id[x]),outstanding_debt[ids1.index(max(temp_id))]]
    for x in range(len(list_cashier_id)):
        temp_id = []
        for y in range(len(cashier_id)):
            if cashier_id[y] == list_cashier_id[x]:
                temp_id.append(ids2[y])
        saldo_dataframe.loc[x] = [saldo[ids2.index(max(temp_id))]]
    outstanding_debt_dataframe['saldo'] = pd.Series(list(saldo_dataframe['saldo'].astype(int)), index=saldo_dataframe.index,dtype=int)
#    print outstanding_debt_dataframe
    def change_to_category_value(debt,saldo):
        if (saldo-debt)/saldo >= 0.9:
            return 65
        elif (saldo-debt)/saldo >= 0.8:
            return 50
        elif (saldo-debt)/saldo >= 0.7:
            return 40
        elif (saldo-debt)/saldo >= 0.6:
            return 30
        elif (saldo-debt)/saldo >= 0.5:
            return 20
        else:
            return 0
    outstanding_debt_dataframe['score'] = outstanding_debt_dataframe.apply(lambda row: change_to_category_value(row['outstanding_debt'],row['saldo']),axis=1)
#    print outstanding_debt_dataframe
    return outstanding_debt_dataframe

#untuk menghitung credit mix
def credit_mix(pinjaman):
    credit_mix_dataframe = pd.DataFrame(data=pinjaman)
#    print credit_mix_dataframe
    def change_to_category_value(jenis_pinjaman):
        if jenis_pinjaman == 1:
            return 15
        if jenis_pinjaman == 2:
            return 25
        if jenis_pinjaman == 3:
            return 50
        if jenis_pinjaman == 4:
            return 60
    credit_mix_dataframe['score'] = credit_mix_dataframe['loan_status'].apply(change_to_category_value)
#    print credit_mix_dataframe
    credit_mix_score = credit_mix_dataframe[['lendee_id','loan_status','score']]
    return credit_mix_score


#total untuk penggabungan trust score
def trust_score():
#    payment_hist = pd.read_csv('csv/data_dummy_payment_history.csv')
    
    payment_hist = upload_data('select * from bankaccount where user_id in (select lendee_id from loanrequest where loan_status in (0,1)) order by user_id,createdAt asc')
#    print payment_hist
    data_new_credit = pd.read_csv('csv/data_dummy_new_credit.csv')
    data_new_credit = data_new_credit[data_new_credit['cashier_id'].isin(list(payment_hist['user_id']))]
#    data_outstanding_debt = pd.read_csv('csv/data_dummy_outstanding_debt.csv')
    data_outstanding_debt = upload_data('select * from loanrequest')    
#    data_saldo = pd.read_csv('csv/data_dummy_saldo.csv')
    data_saldo = upload_data('select * from bankaccount where user_id in (select lendee_id from loanrequest where loan_status in (0,1)) order by user_id,createdAt asc')
#    data_credit_mix = pd.read_csv('csv/data_dummy_pinjaman.csv')
    data_credit_mix = upload_data('select * from loanrequest')
#    print data_credit_mix.dtypes
#    data_credit_mix = data_credit_mix[data_credit_mix['cashier_id'].isin(list(payment_hist['user_id']))]


#    score_payment_history = payment_history(cashier_id=list(payment_hist['cashier_id'].astype(int)),whitelist=list(payment_hist['whitelist'].astype(str)),created_at=list(pd.to_datetime(payment_hist['created_at'])))
    score_payment_history = payment_history(cashier_id=list(payment_hist['user_id'].astype(int)),whitelist=list(payment_hist['whitelist'].astype(str)),created_at=list(pd.to_datetime(payment_hist['createdAt'])))
#    print score_payment_history
#    score_new_credit = new_credit(ids=list(data_new_credit['id'].astype(int)),cashier_id=list(data_new_credit['cashier_id'].astype(int)),new_credit=list(data_new_credit['new_credit'].astype(int)))
#    print score_new_credit
#    score_outstanding_debt = outstanding_debt(ids1=list(data_outstanding_debt['id'].astype(int)),ids2=list(data_saldo['id'].astype(int)),cashier_id=list(data_outstanding_debt['cashier_id'].astype(int)),outstanding_debt=list(data_outstanding_debt['outstanding_debt'].astype(int)),saldo=list(data_saldo['saldo'].astype(int)))
    score_outstanding_debt = outstanding_debt(ids1=list(data_outstanding_debt['id'].astype(int)),ids2=list(data_saldo['id'].astype(int)),cashier_id=list(data_outstanding_debt['lendee_id'].astype(int)),outstanding_debt=list(data_outstanding_debt['amount'].astype(int)),saldo=list(data_saldo['balance'].astype(int)))
#    print score_outstanding_debt
    score_credit_mix = credit_mix(data_credit_mix)
#    print score_credit_mix
    total_score = pd.DataFrame(columns=('cashier_id', 'total_score'))
    total_score['cashier_id'] = pd.Series(list(score_outstanding_debt['cashier_id'].astype(int)), index=score_outstanding_debt.index,dtype=int)
#    print total_score    
    total_score_process = [x + y + z for x, y, z in zip(list(score_payment_history['score']),list(score_outstanding_debt['score']),list(score_credit_mix['score']))]  
    total_score['total_score'] = total_score_process
    total_score['total_score'] = total_score['total_score'].apply(lambda row: format(round(row/float(200),2)))
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

#insert atau update data, input dalam bentuk list
def insert_update_score(user_id,credit_score):
    cursor.execute("""SELECT user_id FROM creditscore;""")
    list_user_id = list(cursor.fetchall())
    list_user_id = [x[0] for x in list_user_id]
    
#    print list_user_id
#    print list_user_id
#
#    for x in list_user_id:
#        print list(x)
#    print len(list_user_id)
#
#    print 2
#    index = ['user_id','credit_score']
#    df = pd.DataFrame(columns=index)
#    for z in range(len(list_user_id)):
#        for x in list_user_id:
#            df.loc[z] = [list(x)]
#    print list_user_id
#    print df
#    print 1
#    print list_user_id.type()
#    df.append(pd.Series(list_user_id,index=index),ignore_index=True)
#    print df

#    list_user_id = pd.DataFrame(data=eval(list_user_id),columns = ['user_id'])
    add_score = ("INSERT INTO creditscore "
               "(createdAt, updatedAt, user_id, score) "
               "VALUES (%s, %s, %s, %s)")
    update_score_table_creditscore = ("UPDATE creditscore SET score = %s, updatedAt = %s"
               "WHERE user_id = %s")
    update_score_table_loanrequest = ("UPDATE loanrequest SET credit_score = %s, updatedAt = %s"
               "WHERE lendee_id = %s")
    update_loan_status = ("UPDATE loanrequest SET loan_status = %s, updatedAt = %s"
               "WHERE lendee_id = %s")
    data_score_insert = (datetime.now(), datetime.now(), user_id,credit_score)
    data_score_update = (credit_score,datetime.now(),user_id)
    if float(credit_score) >= 0.5:
        data_loan_status = (3,datetime.now(),user_id)
    else:
        data_loan_status = (4,datetime.now(),user_id)
#    print user_id
    cursor.execute(update_loan_status,data_loan_status)    
    if user_id in list_user_id:
        cursor.execute(update_score_table_creditscore,data_score_update)
        cursor.execute(update_score_table_loanrequest,data_score_update)        
        db_mysql.commit()
    else:
        cursor.execute(add_score,data_score_insert)
        db_mysql.commit()
        
#print datetime.now().date().time()

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

#    print "Total bunga: "+str(total_bunga)
#    print "Angsuran: "+str(angsuran)
#    for x in score:    
#        output = StringIO()
#        x.to_csv(output)
#        output.seek(0)
#        pt = prettytable.from_csv(output)
#        print "Trust score: "+str(pt)
    cursor.execute("""SELECT loan_status FROM loanrequest;""")
    list_loan_status = list(cursor.fetchall())
    list_loan_status = [x[0] for x in list_loan_status]
    if 0 or 1 not in list_loan_status:
        return 'All Data Updated'        

    score = trust_score()
#    print list(score['total_score'])
#    print score.dtypes
#    print list(score['cashier_id'])
    list_cashier_id = list(score['cashier_id']) 
    list_score = list(score['total_score'])
    list_cashier_id = map(int, list_cashier_id)
    for x in range(len(list_cashier_id)):
        insert_update_score(list_cashier_id[x],list_score[x])
#        print list_cashier_id[x]
#        print list_score[x]
#    output = StringIO()
#    score.to_csv(output)
#    output.seek(0)
#    pt = prettytable.from_csv(output)
#    print "Trust score: "+str(pt)
    cursor.close()
    db_mysql.close()


    
if __name__=="__main__":
#    if main(argv) == 'All Data Updated':
#        print main(argv)
#    else:
#        main(argv)
    main(argv)
