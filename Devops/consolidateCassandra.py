import math
import sys
import time
import re
from cassandra.cluster import Cluster
from cassandra.query import *
cluster = Cluster(['172.31.3.194'], port=9042)
session = cluster.connect()

session.row_factory = dict_factory

statesToInsert=['alabama', 'alaska', 'arizona', 'arkansas', 'california', 'colorado', 'connecticut', 'delaware', 'florida', 'georgia', 'hawaii', 'idaho', 'illinois', 'indiana', 'iowa', 'kansas', 'kentucky', 'louisiana', 'maine', 'maryland', 'massachusetts', 'michigan', 'minnesota', 'mississippi', 'missouri', 'montana', 'nebraska', 'nevada', 'newhampshire', 'newjersey', 'newmexico', 'newyork', 'northcarolina', 'northdakota', 'ohio', 'oklahoma', 'oregon', 'pennsylvania', 'rhodeisland', 'southcarolina', 'southdakota', 'tennessee', 'texas', 'utah', 'vermont', 'virginia', 'washington', 'westvirginia', 'wisconsin', 'wyoming']

for state in statesToInsert:
	#Handle broken keyspace names
	try:
		session.set_keyspace(state)
		timeblocks = sorted(cluster.metadata.keyspaces[state].tables.keys())

		#Handle if the keyspace deosn't have tables yet
		try:
			for timeblock in timeblocks:
				#General exception handling
				try:
					dbQuery = "select * from \"%s\";" % str(timeblock)
					for result in session.execute(dbQuery):
						if result['id'] != '0':
							if len(result['id']) > 18:
								#result['id'] = re.search('.{13}$', result['id'])
								result['id'] = re.search('.{18}$', str(result['id'])).group(0)

								print result
						#dbResult.append(result)
						#insertQuery = "INSERT INTO \"%s\" JSON \'{\"id\":\"0\", \"sentimentscore\":\"%s\"}\';" % (timeblock, overallScore)
						#session.execute(insertQuery)

					'''
					#Debugging printstatements
					else:
						retrieveScore = "select * from \"%s\" where id = \'0\';" % timeblock
						print state, timeblock, session.execute(retrieveScore)[0]["sentimentscore"]
					'''
				
				except Exception as e:
					print e
								
		except Exception as e:
			print e

	except Exception as e:
		print e

cluster.shutdown()