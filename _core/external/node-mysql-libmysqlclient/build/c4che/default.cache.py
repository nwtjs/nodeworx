AR = '/usr/bin/ar'
ARFLAGS = 'rcs'
CCFLAGS = ['-g']
CCFLAGS_MACBUNDLE = ['-fPIC']
CCFLAGS_NODE = ['-D_LARGEFILE_SOURCE', '-D_FILE_OFFSET_BITS=64']
CC_VERSION = ('4', '1', '2')
COMPILER_CXX = 'g++'
CPP = '/usr/bin/cpp'
CPPFLAGS_NODE = ['-D_GNU_SOURCE', '-DEV_MULTIPLICITY=0']
CPPPATH_NODE = '/usr/local/include/node'
CPPPATH_ST = '-I%s'
CXX = ['/usr/bin/g++']
CXXDEFINES_ST = '-D%s'
CXXFLAGS = ['-g', '-Wall', '-I/usr/include/mysql']
CXXFLAGS_DEBUG = ['-g']
CXXFLAGS_NODE = ['-D_LARGEFILE_SOURCE', '-D_FILE_OFFSET_BITS=64']
CXXFLAGS_RELEASE = ['-O2']
CXXLNK_SRC_F = ''
CXXLNK_TGT_F = ['-o', '']
CXX_NAME = 'gcc'
CXX_SRC_F = ''
CXX_TGT_F = ['-c', '-o', '']
DEST_BINFMT = 'elf'
DEST_CPU = 'x86_64'
DEST_OS = 'linux'
FULLSTATIC_MARKER = '-static'
HAVE_MYSQL_H = 1
LIBDIR = '/root/.node_libraries'
LIBPATH_NODE = '/usr/local/lib'
LIBPATH_ST = '-L%s'
LIB_MYSQLCLIENT_R = ['mysqlclient_r']
LIB_ST = '-l%s'
LINKFLAGS = ['-rdynamic', '-L/usr/lib64/mysql', '-lmysqlclient_r', '-lz', '-lpthread', '-lcrypt', '-lnsl', '-lm', '-L/usr/lib64', '-lssl', '-lcrypto']
LINKFLAGS_MACBUNDLE = ['-bundle', '-undefined', 'dynamic_lookup']
LINK_CXX = ['/usr/bin/g++']
NODE_PATH = '/root/.node_libraries'
PREFIX = '/usr/local'
PREFIX_NODE = '/usr/local'
RANLIB = '/usr/bin/ranlib'
RPATH_ST = '-Wl,-rpath,%s'
SHLIB_MARKER = '-Wl,-Bdynamic'
SONAME_ST = '-Wl,-h,%s'
STATICLIBPATH_ST = '-L%s'
STATICLIB_MARKER = '-Wl,-Bstatic'
STATICLIB_ST = '-l%s'
defines = {'HAVE_MYSQL_H': 1}
macbundle_PATTERN = '%s.bundle'
program_PATTERN = '%s'
shlib_CXXFLAGS = ['-fPIC', '-DPIC']
shlib_LINKFLAGS = ['-shared']
shlib_PATTERN = 'lib%s.so'
staticlib_LINKFLAGS = ['-Wl,-Bstatic']
staticlib_PATTERN = 'lib%s.a'
