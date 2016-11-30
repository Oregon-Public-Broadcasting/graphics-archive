import ferns_config

from bs4 import BeautifulSoup
import time, datetime, csv, re

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver import DesiredCapabilities
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

headers = ["Id", "Name", "Date", "Link"]
with open('notifications_download_log.csv', 'a', newline='') as logfile:
    writer = csv.writer(logfile)
    writer.writerow(headers)


# assert "Python" in driver.title
# elem = driver.find_element_by_name("q")
# elem.send_keys("pycon")
# elem.send_keys(Keys.RETURN)
# assert "No results found." not in driver.page_source

# we're gonna fill this up with data
notifications_list = []

url = 'https://ferns.odf.state.or.us/E-Notification/Login'

def crawl(url):

    driver = webdriver.Firefox()
    driver.implicitly_wait(30)
    driver.get(url)

    element = driver.find_element_by_id('loginForm')
    driver.find_element_by_name('Email').send_keys(ferns_config.user)
    driver.find_element_by_name('Password').send_keys(ferns_config.password)
    element.submit()

    search_page = driver.find_element_by_link_text('SEARCH')
    search_page.click()

    searchinput = driver.find_element_by_id("searchInput")
    searchinput.send_keys('-')

    search_go = driver.find_element_by_link_text('GO')
    search_go.click()
    li = driver.find_element_by_class_name('noap-search-result-li')

    while True:
        time.sleep(3)
        next_button = driver.find_element_by_class_name('page-right')
        if 'unavailable' in next_button.get_attribute('class'):
            break;
        html = driver.page_source
        scrape(html)
        next_button.click()


def scrape(html):
    bs = BeautifulSoup(html, "lxml")
    page_number = bs.find('li', {'class', 'current'}).find('a').get_text()
 #  .find('li', {'class', 'current'}).get_text()

    # Find the list of notifications and loop through it
    ul = bs.find_all('ul', {'class', 'search-results-list'})
    for li in bs.find_all('li', {'class', 'noap-search-result-li'}):
        # print("found an <li>")

        id_number = li.find('div', {'class', 'result-details'}).find_all('div')[0].find('p').get_text() #.get_text()
        name = li.find('h5', {'class', 'operation-name'}).find('strong').get_text()
        link = li.find('h5', {'class', 'operation-name'}).find('a').get('href')
        date = li.find('div', {'class', 'result-details'}).find_all('div')[2].find('p').get_text() #.get_text()

        print("NOAP ID:", id_number)
        print("NAME:", name)
        print("DATE:", date)
        print("LINK:", link)
        print("----------------------------------------------------------------------")

        output_dict = {'id_number': id_number, 'name': name, 'date': date, 'link': link }
        output_row = [id_number, name, date, link]
        notifications_list.append(output_dict)

        with open('notifications_download_log.csv', 'a', newline='') as logfile:
            writer = csv.writer(logfile)
            writer.writerow(output_row)

    print("=======================================================================")
    print("FINISHED PAGE {}".format(page_number))
    print("=======================================================================")

crawl(url)
