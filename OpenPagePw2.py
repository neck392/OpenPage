from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

# Set up the WebDriver (use Chrome in this example)
driver = webdriver.Chrome(executable_path='path/to/chromedriver')  # chromedriver 경로 지정

# Navigate to the page
driver.get('wepageurl')

# Wait for the page to load
time.sleep(3)  # 로딩 시간을 보장하기 위해 대기 (필요에 따라 조정 가능)

# Locate the password input field and enter the password
password_input = driver.find_element(By.NAME, 'entry64password')
password_input.send_keys('yourPassword')  # 실제 비밀번호를 입력하세요

# Submit the form
password_input.send_keys(Keys.RETURN)

# Wait for the page to reload and content to appear
time.sleep(5)  # 페이지가 다시 로드될 때까지 대기

# Extract the main content
try:
    main_content = driver.find_element(By.CSS_SELECTOR, 'article, .postContent, .entryContent')
    print('Main Content:', main_content.text)
except:
    print('Main content not found. Please check the selector.')

# Close the browser
driver.quit()
