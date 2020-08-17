text_file = open("1-1000.txt", "r")
lines = text_file.read().split('\n')
lines = '"{0}"'.format('", "'.join(lines))
print(lines)